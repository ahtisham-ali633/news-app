import React, { Component } from "react";
import { Form, Button, Typography,  Modal, Row, Col } from "antd";
import TextInput from "../Common/TextInput/TextInput";
import TextAreaInput from "../Common/TextAreaInput/TextAreaInput";

const { Text } = Typography;

class NewsForm extends Component {
  render() {
    const { formRef, loading, onSubmit, showModal, onCancel } = this.props;
    return (
      <Modal visible={showModal} closable={false} style={{ borderRadius: 31 }} footer={null} centered width={700}>
        <Form initialValues={{ remember: true }} onFinish={onSubmit} ref={formRef}>
          <Row justify="center" style={{ rowGap: 12, display: "flex", flexDirection: "column", alignItems: 'center' }}>
            <Text style={{ fontSize: 35, fontWeight: "600" }}>{`Add New News`}</Text>
            <Row justify="center" style={{ columnGap: 20, marginTop: 10 }}>
              <Col style={{ width: 295 }}>
                <Form.Item rules={[{ required: true, message: "" }]} name="title">
                  <TextInput label="Title" />
                </Form.Item>
              </Col>
              <Col style={{ width: 295 }}>
                <Form.Item rules={[{ required: true, message: "" }]} name="author">
                  <TextInput label="Auther" />
                </Form.Item>
              </Col>
            </Row>
            <Row justify="center" style={{ columnGap: 20 }}>
              <Col style={{ width: 295 }}>
                <Form.Item rules={[{ required: true, message: "" }]} name="description">
                  <TextAreaInput label="Description" />
                </Form.Item>
              </Col>
            </Row>

            <Row justify="center" style={{ columnGap: 10 }}>
              <Col>
                <Form.Item>
                  <Button
                    style={{ height: 54, borderRadius: 15, width: (window.innerWidth < 442) ? 295 : 184 }}
                    block
                    type="primary"
                    size="large"
                    htmlType="submit"
                    loading={loading}
                  >{`Add News`}</Button>
                </Form.Item>
              </Col>
              <Col>
                <Button
                  style={{ height: 54, borderRadius: 15, width: (window.innerWidth < 442) ? 295 : 184 }}
                  type="ghost"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </Row>
        </Form>
      </Modal>
    )
  }
}

export default NewsForm;
