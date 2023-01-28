import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from 'react-router-dom';

import './style.css'

function Note(){
    // const [data, setData] = useState({});
    const params = useParams();
    var search = window.location.search.substring(1);
    search = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
    console.log(search);
    const data = {
        title:'HHH',
        author:'John Doe',
        date:'01/11/2022',
        body:['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec maximus in risus vel vehicula. Sed at eros viverra, ornare mi in, pharetra ligula. Aliquam vel velit tristique, blandit neque at, scelerisque tellus. Aliquam cursus malesuada ultrices. Cras vel placerat velit, nec blandit nisi. Morbi vitae eros quam. In quis risus porta, tempor augue ac, molestie justo.','Praesent sit amet tellus tincidunt dui fermentum vehicula a ut diam. Suspendisse nec sagittis mauris. Aliquam ultrices mauris porta orci vehicula, vel tincidunt libero auctor. Sed finibus neque eu nulla malesuada, vitae bibendum est dapibus. Fusce eget pulvinar nisi. In nec turpis in ex ultrices interdum ut et enim. Mauris mattis velit a risus tincidunt dictum.','In ut elit vehicula, elementum turpis sed, imperdiet diam. Cras luctus arcu ut dapibus aliquet. Fusce fringilla ligula semper quam suscipit congue. Aliquam mattis ut massa eu auctor. Nam dapibus blandit elit eget congue. Aliquam placerat arcu sit amet magna auctor, at placerat lectus luctus. Sed eget lectus ac augue iaculis dictum vitae et massa. Quisque faucibus, est fermentum efficitur ullamcorper, dui justo posuere mauris, sit amet eleifend tellus nisl scelerisque felis. Aliquam erat volutpat. Aliquam sit amet gravida diam. Vivamus turpis nulla, sagittis eu hendrerit vitae, porttitor sit amet arcu. Sed porta venenatis lacus, eu molestie lorem.','Aenean quis mattis risus. Phasellus sed dui congue tortor faucibus feugiat in id ex. Cras dapibus iaculis enim, a convallis est facilisis egestas. Duis vitae ante ornare, tincidunt diam vel, varius mi. Integer venenatis, diam at vehicula cursus, nunc justo luctus urna, et efficitur nulla mauris vel mauris. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin non magna sit amet tellus posuere lacinia. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum ornare at lacus ac dapibus. Ut hendrerit pulvinar consectetur. Aliquam id tincidunt dui, a tempus mauris. Nunc dictum tortor at libero dignissim commodo.','Ut condimentum hendrerit diam quis malesuada. Pellentesque semper ligula turpis, ut euismod leo fermentum quis. Nulla at augue a odio laoreet mattis eu eu diam. Phasellus massa leo, malesuada nec est sed, venenatis interdum purus. Pellentesque finibus sollicitudin metus, ac rhoncus mauris. Aliquam semper diam et tempor vehicula. Vestibulum sagittis neque nisl, at convallis enim vestibulum at. Pellentesque ut magna a justo ornare pharetra ac ut erat. Integer consequat, metus eget tincidunt hendrerit, massa purus iaculis quam, sed fermentum ligula turpis ut justo. Curabitur tincidunt condimentum lobortis.']
    }
    // useEffect(()=>{
    //     axios.get('http://127.0.0.1:5000/nota/'+params.note
    //     ).then(res=>{
    //         setData({... res.data.nota});
    //     }).catch(err=>console.log(err));
    // }, [])
    
    return(
        <div>
            <div className="title">
                <h1>{params.note}</h1>
                <p className="date">{data.date}</p>
            </div>
            <hr />
            {data.body.map((el, key)=>{
                return <p className="paragraph" key={key}>{el}</p>
            })}
            <p className="paragraph author">Por: {data.author}</p>
        </div>
    );
}

export default Note;
