import React, { Component } from 'react';
import shallowEqual from 'react-redux/lib/utils/shallowEqual';

export default class ListItem extends Component {
  static propTypes = {
    value: React.PropTypes.string,
    label: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    className: React.PropTypes.string,
    checked: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    index: React.PropTypes.number,
    visible: React.PropTypes.bool
  };

  static defaultProps = {
    checked: false,
    visible: true,
    className: ''
  };

  // constructor (props) {
  //   super(props);
  // }

  shouldComponentUpdate (nextProps) {
    return !shallowEqual(nextProps, this.props);
  }

  handleChange = () => {
    this.props.onChange(this.props.index);
  }

  render () {
    const {
      value,
      disabled,
      label,
      className,
      checked,
      visible
    } = this.props;

    return (
      <li className={`${className}${visible ? '' : ' hide'}`}>
        <label>
          <input
            onChange={this.handleChange}
            type='checkbox'
            checked={checked}
            value={value}
            disabled={disabled} />
          <span>{label}</span>
        </label>
      </li>
    );
  }
};
