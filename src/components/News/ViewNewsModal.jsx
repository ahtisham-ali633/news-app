import React, { Component } from "react";
import { Modal, Form, Button, Row, Image } from "antd";
import moment from "moment";
import "../../App.css"

const YMD_FORMAT = 'YYYY-MM-DD';

class ViewNewsModal extends Component {
    render() {
        const { visible, newsDetail, onCancel, formRef } = this.props;
        const layout = { labelCol: { span: 8 }, wrapperCol: { span: 8 } };

        return (
            <Row>
                <Modal closable={false} visible={visible} style={{ borderRadius: 31}} footer={null} centered width={700}>
                    <Row justify="center" style={{fontWeight: "bold", marginTop: "1rem", fontSize: 25}}>
                        {newsDetail.title}
                    </Row>
                    <Row justify="left" style={{marginTop: "1rem"}}>
                        <Image height={120} width={140} style={{borderRadius: 15 }} src={`${newsDetail.urlToImage}`} alt="Image not found"/>
                    </Row>
                    <Row justify="center" style={{marginTop: "1rem", fontWeight: "bold", fontSize: 16}}>
                        {newsDetail.author}
                    </Row>
                    <Row justify="center">
                        publishedAt: {moment(newsDetail.publishedAt).format(YMD_FORMAT)}
                    </Row>
                    <Row justify="center" style={{marginTop: "1rem"}}>
                        {newsDetail.description}
                    </Row>
                    <Row justify="center" style={{marginTop: "2rem"}}>
                        <Form name="consent_form" ref={formRef} className="consent-edit-form" initialValues={newsDetail} layout={layout}>
                            <Row justify="center" style={{ columnGap: 10 }}>
                                <Form.Item>
                                    <Button
                                        style={{
                                            height: 54,
                                            borderRadius: 15,
                                            width: (window.innerWidth < 442) ? 295 : 184
                                        }}
                                        type="ghost"
                                        onClick={onCancel}
                                    >
                                        Cancel
                                    </Button>
                                </Form.Item>
                            </Row>
                        </Form>
                    </Row>

                </Modal>
            </Row>
        )
    }
}

export default ViewNewsModal;
