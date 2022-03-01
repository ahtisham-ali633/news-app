import React, { Component } from "react";
import { Input, Typography } from "antd";
const { Text } = Typography;

class TextInput extends Component {
    render() {
        const { label, value, onChange, disabled } = this.props;
        return (
          <div>
              <Text>{label}</Text>
              <Input style={{borderRadius: 15, padding: 10}} value={value} onChange={onChange} disabled={disabled} />
          </div>  
        );
    }
}

export default TextInput;
