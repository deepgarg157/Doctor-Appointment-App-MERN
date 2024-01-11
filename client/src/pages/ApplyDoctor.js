import React from 'react'
import Layout from '../components/Layout'
import { Col, Form, Input, Row, TimePicker } from 'antd'
import '../styles/ApplyDoctorStyles.css'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { showLoading, hideLoading } from '../Utility/alertSlice'

const ApplyDoctor = () => {

    const dispatch = useDispatch()
    const { user } = useSelector(store => store.user)
    const navigate = useNavigate()
    const handleFinish = async (values) => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/apply-doctor', { ...values, userId: user._id },
                {
                    headers: {
                        Authorization: "Bearer" + " " + localStorage.getItem('token')
                    }
                }
            )
            dispatch(hideLoading())
            if(res.data.success){
               toast.success(res.data.message)
               navigate('/')
            }
            else{
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            dispatch(hideLoading())
            toast.error('Something went wrong....')
        }
    }

    return (
        <div>
            <Layout>
                <Form layout='vertical' className='doctor-container m-3' onFinish={handleFinish}>
                    <h1 className='apply-doctor'>Apply Doctor</h1>
                    <Row gutter={20}>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item className='form-label' label="Full-Name" name='firstName'>
                                <Input type="text" placeholder='Enter the first name' required />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item className='form-label' label="Last-Name" name='lastName'>
                                <Input type="text" placeholder='Enter the last name' required />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item className='form-label' label="Phone" name='phone'>
                                <Input type="number" placeholder='Enter the phone number' required />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item className='form-label' label="Email" name='email'>
                                <Input type="email" placeholder='Enter the email' required />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item className='form-label' label="Web-site" name='website'>
                                <Input type="text" placeholder='Enter the web-site' required />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item className='form-label' label="Address" name='address'>
                                <Input type="text" placeholder='Enter the address' required />
                            </Form.Item>
                        </Col>
                    </Row>
                    <h3>Personal Details</h3>
                    <Row gutter={20}>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item className='form-label' label="Specialization" name='specialization'>
                                <Input type="text" placeholder='Enter the specialization' required />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item className='form-label' label="Experience" name='experience'>
                                <Input type="text" placeholder='Enter the experience' required />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item className='form-label' label="Fees-Per-Cunsaltation" name='feesPerCunsaltation'>
                                <Input type="number" placeholder='Enter the fees-Per-Cunsaltation' required />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item className='form-label' label="Timings" name='timings'>
                                <TimePicker.RangePicker format={'HH:mm'} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <button type='submit' className='btn btn-primary'>Submit</button>
                </Form>
            </Layout>
        </div>
    )
}

export default ApplyDoctor;
