import React from 'react';
import { Modal, Button, Input, Select } from 'antd';

const Option = Select.Option;

export default ({ isOpen, toggle, submit, edit }) => {

  return (
    <Modal title="TO: User"
     visible={isOpen}
     onOk={submit}
     onCancel={toggle}
     footer={[
            <Button key="back" onClick={toggle}>Cancel</Button>,
            <Button key="submit" type="primary" onClick={submit}>
            	Send Message
            </Button>,
          ]}
     >
        <Select 
        defaultValue="Teacher"
        style={{ width: '80%' }}
        onChange={edit}
        mode="multiple"
        size="default"
          placeholder="Please select"
        >
          <Option value="Student">Student</Option>
          <Option value="Teacher">Teacher</Option>
          <Option value="Class" disabled>Class</Option>
        </Select>
     	<Input placeholder="Enter Recipient's name..."/>
        <Input type="textarea" name="body" placeholder="message" />
    </Modal>
  );
};
