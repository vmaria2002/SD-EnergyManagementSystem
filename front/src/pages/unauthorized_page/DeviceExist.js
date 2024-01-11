// DeviceExist.js
import React, { useState, useEffect } from "react";
import TemplateExist from "./TemplateExist";

export default function DeviceExist() {
    const [imageUrl, setImageUrl] = useState();
    const [msg, setMsq] = useState();

    useEffect(() => {
            setImageUrl("https://blog.athom.com/wp-content/uploads/2019/10/2b8e1b09-811d-4220-9d25-d68e535778ce-1024x454.jpg");
    }, []);

    useEffect(() => {
        setMsq("Ne pare rau, dar acest  dispozitiv exista deja")
    }, []);

    return (
        <div>
            <TemplateExist imageUrl={imageUrl} msg={msg}/>
        </div>
    );
}
