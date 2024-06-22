import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { getDocs, collection, doc, setDoc, query, where, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

const Home = () => {
    const [stuNum, setStuNum] = useState("");
    const [gakuyukaiinnData, setGakuyukaiinnData] = useState([]);
    const [gityoininData, setGityoininData] = useState([]);
    const [kojinininData, setKojinininData] = useState([]);
    const [shussekiData, setShussekiData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const gakuyukaiinnSnapshot = await getDocs(collection(db, "Gakuyukaiinn"));
            setGakuyukaiinnData(gakuyukaiinnSnapshot.docs.map((doc) => doc.data()));

            const gityoininSnapshot = await getDocs(collection(db, "gityoinin"));
            setGityoininData(gityoininSnapshot.docs.map((doc) => doc.data()));

            const kojinininSnapshot = await getDocs(collection(db, "kojininin"));
            setKojinininData(kojinininSnapshot.docs.map((doc) => doc.data()));
        } catch (error) {
            console.error("Error fetching documents: ", error);
        }
    };

    const handleClick = async (e) => {
        e.preventDefault();
        if (stuNum.length === 7) {
            await fetchData();
            console.log(gakuyukaiinnData);
            const shussekisha = getstuData(stuNum);

            if (gakuyukaiinnData.some((data) => data.stu_id === Number(stuNum))) {
                if (gityoininData.some((data) => data.stu_id === Number(stuNum))) {
                    if (window.confirm(`学籍番号: ${stuNum} の議長委任を取り消しますか？`)) {
                        await deleteGityoininData(stuNum);
                        window.alert("委任を取り消しました。再度学籍番号を入力してください。");
                    }
                } else if (kojinininData.some((data) => data.stu_id === Number(stuNum))) {
                    if (window.confirm(`学籍番号: ${stuNum} の個人委任を取り消しますか？`)) {
                        const result = await deletekojinininData(stuNum);
                        window.alert(result ? "個人委任を取り消しました。再度学籍番号を入力してください" : "個人委任データの取り消しに失敗しました。");
                    }
                } else {
                    if (window.confirm(`学籍番号: ${stuNum} ${shussekisha[0].firstname} ${shussekisha[0].lastname}の出席データを更新しますか？`)) {
                        await updateShussekiData(stuNum);
                        window.alert(`${shussekisha[0].firstname} ${shussekisha[0].lastname} さんの出席データを更新しました。\n 票数は${shussekisha[0].hyousuu}票です。`);
                    }
                }
            } else {
                window.alert("学友会員ではありません。");
            }
        } else {
            window.alert("学籍番号は7桁の半角数字で入力してください。");
        }
        fetchData();
    };

    const getstuData = (stuNum) => {
        return gakuyukaiinnData.filter((data) => data.stu_id === Number(stuNum));
    };

    const deletekojinininData = async (stuNum) => {
        let inin_stu_id = 0;
        const q = query(collection(db, "kojininin"), where("stu_id", "==", Number(stuNum)));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            for (const doc of querySnapshot.docs) {
                inin_stu_id = doc.data().inin_stu_id;
                await deleteDoc(doc.ref);
            }
        }

        const shussekiQuery = query(collection(db, "shussekisha"), where("stu_id", "==", Number(inin_stu_id)));
        const shussekiSnapshot = await getDocs(shussekiQuery);

        if (!shussekiSnapshot.empty) {
            for (const shussekiDoc of shussekiSnapshot.docs) {
                const shussekiData = shussekiDoc.data();
                if (shussekiData.hyousuu > 0) {
                    window.alert(`${shussekiData.firstname} ${shussekiData.lastname} さんの出席データを更新します。票数は${shussekiData.hyousuu - 1}票です。\nすでに入場していますので、席の移動をお願いします。`);
                    await updateDoc(shussekiDoc.ref, {
                        hyousuu: shussekiData.hyousuu - 1
                    });
                }
            }
        }

        return !querySnapshot.empty;
    };

    const deleteGityoininData = async (stuNum) => {
        const q = query(collection(db, "gityoinin"), where("stu_id", "==", Number(stuNum)));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            for (const doc of querySnapshot.docs) {
                await deleteDoc(doc.ref);
            }
        }
    };

    const updateShussekiData = async (stuNum) => {
        let hyousuu = 1;
        kojinininData.forEach((data) => {
            if (data.inin_stu_id === Number(stuNum)) {
                hyousuu++;
            }
        });

        let newShussekiData = gakuyukaiinnData.filter((data) => data.stu_id === Number(stuNum));
        newShussekiData[0].updateTime = new Date();
        newShussekiData[0].hyousuu = hyousuu;
        setShussekiData(newShussekiData);
        await setDoc(doc(db, "shussekisha", stuNum), newShussekiData[0]);
        return hyousuu;
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        const regex = /^[0-9]*$/; // 半角数字の正規表現
        if (regex.test(value) && value.length <= 7) {
            setStuNum(value);
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: "20px" }}>
                <Typography variant="h5">出席・委任取り消し用ページ</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: "50px" }}>
                <TextField
                    label="学籍番号を入力してください"
                    variant="outlined"
                    value={stuNum}
                    onChange={handleInputChange}
                    sx={{ width: "400px" }}
                />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: "50px" }}>
                <Button
                    variant="contained"
                    onClick={handleClick}
                    disabled={stuNum.length !== 7}
                >
                    送信
                </Button>
            </Box>
        </Box>
    );
};

export default Home;
