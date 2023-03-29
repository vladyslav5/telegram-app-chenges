import React, {useEffect} from 'react';
import Header from "./components/Header/Header";
import {useTelegram} from "./hook/useTelegram";
import Form from "./components/Form/Form";


const App = () => {
    const {tg, onToggleButton} = useTelegram()
    useEffect(() => {
        tg.ready()
    }, [])

    return (
        <div>
            <Header/>
            <Form/>
        </div>
    );
};

export default App;