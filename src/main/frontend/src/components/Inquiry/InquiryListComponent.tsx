/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */

import React, { useContext, useEffect, useState } from "react"
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as InquiryService from "../../service/InquiryService";
import AuthContext from '../../store/authContext';
import {InquiryInterface} from '../Inquiry/InquiryInterface';

const InquiryList: React.FC = (props: any) => {
    const [inquiryList, setInquiryList] = useState<Array<InquiryInterface>>([]);
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
    const navigate = useNavigate();

    useEffect(() => {
        getInquiryList();
    }, []);
        
    const getInquiryList = async () => {
    
        const listData = InquiryService.getInquiryList(token);  
       
        const newInquiryList = (await listData).data.inquiryList
        setInquiryList(newInquiryList)
        console.log('listData', (await listData).data)
        console.log('inquiryList', inquiryList)
    }

    const InquiryRead = (no:number | undefined) => {
        navigate('/inquiryRead?no='+no);
    };

    const InquiryWrite = () => {
        navigate('/inquiryWrite')
    }

    return (
        
        <>  
            <div className="inquiry_list">
                <h2 className="text-center"> 1:1 문의 </h2>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>제    목</th>
                                <th>작 성 자</th>
                                <th>날    짜</th>
                            </tr>
                        </thead>
                        <tbody>
                        { 
                        Array.isArray(inquiryList) && inquiryList.map((inquiry: InquiryInterface) =>
                        <tr key = {inquiry.no}>
                            <td> <a onClick = {()=> InquiryRead(inquiry.no)}> {inquiry.title}</a></td>
                            <td>{inquiry.userId}</td>
                            <td>{inquiry.time}</td>
                        </tr>
                        )}
                         </tbody>
                    </table>
                    <Button variant="primary" onClick={() => InquiryWrite()}>등 록</Button>

                </div>
            </div>
        </>
    );
};

export default InquiryList;