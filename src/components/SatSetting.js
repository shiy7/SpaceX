import React, {Component} from 'react';
import {Form, Button, InputNumber} from "antd";

class SatSettingForm extends Component {

  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 11},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 13},
      },
    }
    return (
        <Form {...formItemLayout} className="sat-setting"
              onSubmit={this.showSatellite}>
          <Form.Item label="Longitude(degrees)">
            {
              getFieldDecorator("longitude", {
                rules: [
                  {
                    required: true,
                    message: "Please input your Longitude"
                  }
                ],
              }) (<InputNumber min={-180} max={180}
                               style={{width:"100%"}}
                               placeholder= "Please input your Longitude"
              />)
            }
          </Form.Item>

          <Form.Item label="Latitude(degrees)">
            {
              getFieldDecorator("latitude", {
                rules: [
                  {
                    required: true,
                    message: "Please input your Latitude"
                  }
                ],
              }) (<InputNumber min={-90} max={90}
                               style={{width:"100%"}}
                               placeholder= "Please input your Latitude"
              />)
            }
          </Form.Item>

          <Form.Item label="Elevation(meters)">
            {
              getFieldDecorator("elevation", {
                rules: [
                  {
                    required: true,
                    message: "Please input your Elevation"
                  }
                ],
              }) (<InputNumber min={-413} max={8850}
                               style={{width:"100%"}}
                               placeholder= "Please input your Elevation"
              />)
            }
          </Form.Item>

          <Form.Item label="Altitude(degrees)">
            {
              getFieldDecorator("altitude", {
                rules: [
                  {
                    required: true,
                    message: "Please input your Altitude"
                  }
                ],
              }) (<InputNumber min={0} max={90}
                               style={{width:"100%"}}
                               placeholder= "Please input your Altitude"
              />)
            }
          </Form.Item>

          <Form.Item label="Duration(secs)">
            {
              getFieldDecorator("duration", {
                rules: [
                  {
                    required: true,
                    message: "Please input your Duration"
                  }
                ],
              }) (<InputNumber min={0} max={90}
                               style={{width:"100%"}}
                               placeholder= "Please input your Duration"
              />)
            }
          </Form.Item>

          <Form.Item label="show-nearby">
            <Button type="primary" htmlType="submit"
                    style={{textAlign:"center"}}>
              Find Nearby Satellite
            </Button>
          </Form.Item>

        </Form>
    );
  }

  showSatellite = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.onshow(values);
      }
    })
  }
}

const SatSetting = Form.create({name: 'satellite-setting'})(SatSettingForm)
export default SatSetting;