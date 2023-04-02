import React, {useCallback, useEffect, useState} from 'react';
import "./Form.css"
import axios from "axios";
import {useTelegram} from "../../hook/useTelegram";

const Form = () => {
    // const [name, setName] = useState("")
    // const [lastName, setLastName] = useState("")
    const [course, setCourse] = useState("")
    const [group, setGroup] = useState("")
    const [groups, setGroups] = useState()
    const {tg} = useTelegram()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
       tg.MainButton.setParams({
           text:"Далі"
       })
    },[])
    const onSendData = useCallback(() => {
        const data = {
            course,
           // name,
          //  lastName,
            group
        }
        tg.sendData(JSON.stringify(data))
    }, [course,group])
    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])
    useEffect(() => {
        setIsLoading(true)
        axios.get("https://telegrambot.vmorshch8.repl.co/groups", {params: {course}}).then((res) => {
            const {data} = res
            console.log(res.data.groups)
            setGroups(data.groups)
            setIsLoading(false)
        })
    }, [course])
    useEffect(() => {
        if (/*!name || !lastName*/  !course || !group) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
        }
    }, [group,course])
    return (
        <div className={"form"}>
            <h1>Оберіть розклад для группи</h1>
            <select className={"select"} value={course} onChange={e => setCourse(e.target.value)}>
                <option></option>
                <option value={1}>1 курс</option>
                <option value={2}>2 курс</option>
                <option value={3}>3 курс</option>
                <option value={4}>4 курс</option>
            </select>
            {
                groups &&
                <>
                    {
                        isLoading ?
                            <div>Loading...</div>
                            :
                            <>
                                <label className={"label"}>группа</label>
                                <select className={"select"} value={group} onChange={e => setGroup(e.target.value)}>
                                    <option></option>
                                    {
                                        groups.map(c => <option key={c.key} value={c.key}>{c.key + " группа"}</option>)
                                    }
                                </select>
                            </>
                    }
                </>

            }

        </div>
    );
};

export default Form;