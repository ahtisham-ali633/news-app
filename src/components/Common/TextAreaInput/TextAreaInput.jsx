import React, { Component } from "react";
import { Input, Typography } from "antd";
const { Text } = Typography;

class TextAreaInput extends Component {
    render() {
        const { label, value, onChange, disabled } = this.props;
        return (
            <div>
                <Text>{label}</Text>
                <Input.TextArea style={{borderRadius: 15, padding: 10}} value={value} onChange={onChange} disabled={disabled} />
            </div>
        );
    }
}

export default TextAreaInput;
