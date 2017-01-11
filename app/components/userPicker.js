import React, { Component } from 'react';
import ListItem from 'components/generic/ListItemComp';
import shallowEqual from 'react-redux/lib/utils/shallowEqual';
import SearchInput from 'components/generic/SearchInputComp';

const function arrayToObj (arr, key) {
  if (!Array.isArray(arr) || !arr.length) {
    return {};
  }

  return (arr.reduce((prev, current) => {
    prev[typeof current === 'string' ? current : current[key]] = current;
    return prev;
  }, {}));
}

export default class List extends Component {
  static propTypes = {
    list: React.PropTypes.array,
    checkedList: React.PropTypes.array,
    valueKey: React.PropTypes.string,
    labelKey: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    checkedKey: React.PropTypes.string,
    showSearch: React.PropTypes.bool,
    showSelectAll: React.PropTypes.bool,
    className: React.PropTypes.string,
    bodyClassName: React.PropTypes.string,
    headerClassName: React.PropTypes.string,
    searchClassName: React.PropTypes.string,
    label: React.PropTypes.string
  };

  static defaultProps = {
    list: [],
    checkedList: [],
    showSearch: false,
    showSelectAll: false,
    disabled: false,
    label: ''
  };

  constructor (props) {
    super(props);
    this.state = {
      list: this.props.list,
      allChecked: false
    };
  }

  componentWillReceiveProps (nextProps) {
    if (!shallowEqual(nextProps, this.props)) {
      const checkedObj = arrayToObj(nextProps.checkedList, nextProps.checkedKey);

      this.setState({
        list: nextProps.list.map((item) => {
          item.checked = checkedObj.hasOwnProperty(item[nextProps.checkedKey]);
          return item;
        }),
        allChecked: this.changeAllCheckedState(nextProps, checkedObj)
      });
    }
  }

  changeAllCheckedState = (nextProps, checkedObj) => {
    return nextProps.list.every((item) => checkedObj.hasOwnProperty(item[nextProps.checkedKey]));
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !shallowEqual(nextProps, this.props) || !shallowEqual(nextState, this.state);
  }

  handleChange = (index) => {
    let clonedList = this.state.list.slice();
    clonedList[index].checked = !clonedList[index].checked;
    this.setState({
      list: clonedList
    });
  }

  search = (value) => {
    this.setState({
      list: this.state.list.map((obj) => {
        obj.visible = obj[this.props.labelKey].toLowerCase().indexOf(value.toLowerCase()) !== -1;
        return obj;
      })
    });
  }

  toggleAll = () => {
    this.setState({
      allChecked: !this.state.allChecked,
      list: this.state.list.map((item) => {
        item.checked = !this.state.allChecked;
        return item;
      })
    });
  }

  render () {
    const {
      valueKey,
      labelKey,
      disabled,
      showSearch,
      className,
      showSelectAll,
      label,
      headerClassName,
      searchClassName,
      bodyClassName
    } = this.props;

    const {
      list,
      allChecked
    } = this.state;

    return (
      <div className={className}>
        <div className={headerClassName}>
          <strong className={label ? '' : 'hide'}>{label}</strong>
          <label className={showSelectAll ? '' : 'hide'}>
            Select All
            <input disabled={disabled} type='checkbox' checked={allChecked} onChange={this.toggleAll} />
          </label>
        </div>
        <div className={`${searchClassName} ${showSearch ? '' : 'hide'}`}>
          <SearchInput
            classFile='SearchInputPredicateComp'
            placeholder='Search for...'
            triggerInputChange={this.search} />
        </div>
        <ul className={bodyClassName}>
          {
            list.map((item, index) => {
              return (<ListItem
                onChange={this.handleChange}
                key={index}
                value={typeof item === 'string' ? item : item[valueKey]}
                label={typeof item === 'string' ? item : item[labelKey]}
                disabled={disabled}
                index={index}
                checked={item['checked']}
                visible={item['visible']}
              />);
            })
          }
        </ul>
      </div>
    );
  }
};
