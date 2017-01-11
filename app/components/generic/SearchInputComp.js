/**
 * Generic Search input
 */
import React, { Component } from 'react';
import SearchSvgIcon from 'components/generic/svgIcons/SearchSvgIcon';

export default class SearchInputComp extends Component {
  static propTypes = {
    placeholder: React.PropTypes.string,
    optionalValue: React.PropTypes.string,
    triggerInputChange: React.PropTypes.func,
    classFile: React.PropTypes.string
  }

  static defaultProps = {
    placeholder: '',
    optionalValue: '',
    classFile: 'SearchInputCompDef'
  }

  constructor (props) {
    super(props);

    this.state = {
      value: props.optionalValue,
      Timer: '',
      classes: require(`./../../styles/generic/${props.classFile}.scss`) || {}
    };
  }

  changeInputHandler = (e) => {
    let inputVal = e.target.value.trim();
    clearTimeout(this.state.Timer);
    this.setState({
      value: inputVal,
      Timer: setTimeout(() => {
        this.props.triggerInputChange(inputVal);
      }, 500)
    });
  }

  render () {
    const { placeholder } = this.props;
    const { classes } = this.state;

    return (
      <div className={classes['search-box']}>
        <SearchSvgIcon width='15' color='#fff' className={classes['search-svg']} />
        <input type='text'
          className={classes['search-input']}
          onChange={this.changeInputHandler}
          placeholder={placeholder} />
      </div>
    );
  }
}
