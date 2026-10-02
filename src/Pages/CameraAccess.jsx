import { useEffect, useRef, useState } from "react";
import React from 'react'

function CameraAccess({onPhotoCapture}) {
    const videoRef=useRef(null)
    const streamRef=useRef(null)

    const [photo,setPhoto]=useState(null)

    //Camera start
    const startCamera=async()=>{
        try{
            const stream=await navigator.mediaDevices.getUserMedia({
                video:{
                    facingMode:"user",
                },
                audio:false,
            });

            streamRef.current=stream;
            if(videoRef.current){
                videoRef.current.srcObject=stream;
            }
        }catch(error){
            console.log(error);
            alert("Please allow Camera permission")
        }
    };
    //camera stop
    const stopCamera=()=>{
        if(streamRef.current){
            streamRef.current.getTracks().forEach((track)=>{
                track.stop();
            });
            streamRef.current=null;
        }
    };
    //Photo capture
    const capturePhoto=()=>{
        const video=videoRef.current;

        const canvas=document.createElement("canvas")
        canvas.width=video.videoWidth;
        canvas.height=video.videoHeight;

        const context=canvas.getContext("2d")
        context.drawImage(video,0,0,canvas.width,canvas.height);

        canvas.toBlob(
            (blob)=>{
                const file=new File(
                    [blob],"visitor-photo.jpg",
                    {
                        type:"image/jpeg",
                    }
                );
                const previewUrl=URL.createObjectURL(file)
                setPhoto(previewUrl);

                //Upload file to parent Component
                onPhotoCapture(file);
                stopCamera();
            },
            "image/jpeg"
        );
    };
    //ReTake
    const retakePhoto=()=>{
        setPhoto(null);
        startCamera();
    };

    //Start Camera when component opened
    useEffect(()=>{
        startCamera();
        return()=>{
            stopCamera();
        };
    },[]);
  return (
    <div>
        {
            !photo ? (
                <>
                    <video ref={videoRef}
                    autoPlay
                    playsInline
                    className="h-auto w-full max-w-80 rounded-lg border"
                    />
                    <button type="button" onClick={capturePhoto} className="bg-blue-600 text-white px-5 py-2 rounded-lg mt-3">Capture Photo</button>
                </>
            ):(
                <>
                <img src={photo} alt="Visitor" className="h-auto w-full max-w-80 rounded-lg"/>
                <button type="button" onClick={retakePhoto} className="bg-gray-600 text-white px-5 py-2 rounded-lg mt-3">Retake</button>
                </>
            )
        }
    </div>
  )
}

export default CameraAccess