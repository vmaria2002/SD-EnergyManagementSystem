// DeviceExist.js
import React, { useState, useEffect } from "react";
import TemplateExist from "./TemplateExist";

export default function UserExist() {
    const [imageUrl, setImageUrl] = useState();
    const [msg, setMsq] = useState();

    useEffect(() => {
        setImageUrl("https://cdn-icons-png.flaticon.com/512/5087/5087579.png")
    }, []);

    useEffect(() => {
        setMsq("Ne pare rau, dar acest  utilizator exista deja")
    }, []);

    return (
        <div>
            <TemplateExist imageUrl={imageUrl} msg={msg}/>
        </div>
    );
}
