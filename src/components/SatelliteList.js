import React, {Component} from 'react';
import {List, Avatar, Button, Checkbox, Spin} from "antd";
import satellite from '../assets/images/satellite.svg'

class SatelliteList extends Component {
  state = {
    selected: [],
    isLoad: false
  }

  onChange = e => {
    // console.log('selected checkbox ',e.target);
    // console.log('data ', e.target.dataInfo);

    // step 1. get current selected sat info
    const {dataInfo, checked} = e.target;
    const {selected} = this.state;
    // step 2. add or remove current selected sat to/from selected array
    const list = this.addOrRemove(dataInfo, checked, selected);
    // step 3. update selected state
    this.setState({selected: list});
  }

  addOrRemove = (item, status, list) => {
    const found = list.some(entry => entry.satid === item.satid);
    // console.log('found ->', found);

    // case 1. check is true
    //          -> item not in the list => add the item
    //          -> item is in the list => do nothing
    if (status && !found){
      list.push(item);
      // list = [...list, item];
    }
    // console.log('list -> ', list);

    // case 2. check is false
    //          -> item is in the list => remove the item
    //          -> item not in the list => do nothing
    if (!status && found){
      list = list.filter(entry => {
        return entry.satid !== item.satid;
      })
    }

    return list;
  }

  onShowSatMap = () => {
    this.props.onShowMap(this.state.selected);
  }


  render() {
    const satList = this.props.satInfo ? this.props.satInfo.above : [];
    const { isLoad } = this.props;
    const { selected } = this.state;
    return (
        <div className="sat-list-box">
          <div className="btn-container">
            <Button className="sat-list-btn"
                    size="large"
                    disabled={selected.length === 0}
                    onClick={this.onShowSatMap}
            >
              Track on the map
            </Button>
          </div>

          <hr />
          {
            isLoad ?
                <div className="spin-box" >
                  <Spin tip="Loading..." size="large" />
                </div>
                :
                <List
                    className="sat-list"
                    itemLayout="horizontal"
                    size="small"
                    dataSource={satList}
                    renderItem={
                      item => (
                        <List.Item
                            actions={[
                                <Checkbox dataInfo={item}
                                          onChange={this.onChange} />]} >
                          <List.Item.Meta
                            avatar={<Avatar size={50}
                                            src={satellite} />}
                            title={<p>{item.satname} </p>}
                            description={`Launch Date: ${item.launchDate}`} />
                        </List.Item>
                    )}
                />
          }

        </div>
    );
  }
}

export default SatelliteList;