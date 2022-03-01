import React, { Component } from "react";
import { Input } from "antd";

class SearchInput extends Component {
    render() {
        const { value, onChange } = this.props;
        return (
          <div>
              <Input style={{borderRadius: 15, padding: 10}} value={value} onChange={onChange} placeholder="Search" />
          </div>  
        );
    }
}

export default SearchInput;
