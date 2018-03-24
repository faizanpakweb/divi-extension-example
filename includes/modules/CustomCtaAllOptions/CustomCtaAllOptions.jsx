// External Dependencies
import React, { Component } from 'react';

// Internal Dependencies
import './style.css';


class CustomCtaAllOptions extends Component {
  renderButton() {
    const attrs = this.props;
    const utils = this.props.utils;
    const buttonTarget = 'on' === attrs.url_new_window ? '_blank' : '';
    const isCustomButtonIcon = utils.hasValue(attrs.button_icon);
    const buttonIcon = isCustomButtonIcon ? utils.processFontIcon(attrs.button_icon) : false;
    const buttonClassName = {
      et_pb_promo_button: true,
      et_pb_button: true,
      et_pb_custom_button_icon: isCustomButtonIcon,
    };

    return ! utils.hasValue(attrs.button_text) || ! utils.hasValue(attrs.button_url) ? '' : (
      <div className='et_pb_button_wrapper'><a
        className={utils.classnames(buttonClassName)}
        href={attrs.button_url}
        target={buttonTarget}
        rel={utils.linkRel(attrs.button_rel)}
        data-icon={buttonIcon}
      >{attrs.button_text}</a></div>
    );
  }

  renderProp(value, fieldName, fieldType, renderSlug) {
    const utils = this.props.utils;
    const _ = utils._;
    const orderClass = `${this.props.moduleInfo.type}_${this.props.moduleInfo.order}`;
    let output = '';

    if (!utils.hasValue(value)) {
      return output;
    }

    const optionSearch = ['&#91;', '&#93;'];
    const optionReplace = ['[', ']'];

    switch(fieldType) {
      case 'options_list':
        value = _.replace(_.replace(value, optionSearch[0], optionReplace[0]), optionSearch[1], optionReplace[1]);
        value = JSON.parse( value );

        if (_.isArray(value)) {
          output = value.map((option, index) => {
            return (
              <option key={`${orderClass}-${index}`} value={option.value}>{option.value}</option>
            );
          });
        }
        break;
      case 'options_list_checkbox':
        const checkboxName = `${orderClass}_${fieldName}`;

        value = _.replace(_.replace(value, optionSearch[0], optionReplace[0]), optionSearch[1], optionReplace[1]);
        value = JSON.parse( value );

        if (_.isArray(value)) {
          output = value.map((option, index) => {
            const checkboxID = `${checkboxName}_${index}`;
            const isChecked = 1 === option.checked;

            return(
              <span className="checkbox-wrap" key={`${orderClass}-${index}`}>
                <input type="checkbox" id={checkboxID} className="input" value={option.value} checked={isChecked} />
                <label htmlFor={checkboxID}><i></i>{option.value}</label>
              </span>
            );
          });
        }
        break;
      default:
        output = value;
        break;
    }

    return output;
  }

  render() {
    const i10n = window.DiviCustomModulesSettings.i10n.dicm_cta_all_options;
    const attrs = this.props;

    return (
      <div>
        <h2 className="dicm-title">{this.props.title}</h2>
        <div className="dicm-content">{this.props.content()}</div>
        {this.renderButton()}
        <div className="basic-fields fields-group">
          <h3>{i10n.basic_fields}</h3>
          <h4>{i10n.text}</h4>
          {attrs.text}
          <h4>{i10n.textarea}</h4>
          {attrs.textarea}
          <h4>{i10n.select}</h4>
          {attrs.select}
          <h4>{i10n.toggle}</h4>
          {attrs.toggle}
          <h4>{i10n.multiple_buttons}</h4>
          {attrs.multiple_buttons}
          <h4>{i10n.multiple_checkboxes}</h4>
          {attrs.multiple_checkboxes}
          <h4>{i10n.input_range}</h4>
          {attrs.input_range}
          <h4>{i10n.input_datetime}</h4>
          {attrs.input_datetime}
          <h4>{i10n.input_margin}</h4>
          {attrs.input_margin}
          <h4>{i10n.checkboxes_category}</h4>
          {attrs.checkboxes_category}
          <h4>{i10n.select_sidebar}</h4>
          {attrs.select_sidebar}
        </div>

        <div className="code-fields fields-group">
          <h3>{i10n.code_fields}</h3>
          <h4>{i10n.codemirror}</h4>
          {/* @todo: figure out how to pass down ETEditableBlock component  */}
          {attrs.codemirror}
        </div>

        <div className="form-fields fields-group">
          <h3>{i10n.form_fields}</h3>
          <h4>{i10n.option_list}</h4>
            <p>{i10n.prop_value}</p>
            <pre>{attrs.option_list}</pre>
            <p>{i10n.rendered_prop_value}</p>
            <select name="option-name">
              {this.renderProp(attrs.options_list, 'options_list', 'options_list', attrs.moduleInfo.type)}
            </select>
          <h4>{i10n.option_list_checkbox}</h4>
            <p>{i10n.prop_value}</p>
            <pre>{attrs.options_list_checkbox}</pre>
            <p>{i10n.rendered_prop_value}</p>
            <p>
              {this.renderProp(attrs.options_list_checkbox, 'options_list_checkbox', 'options_list_checkbox', attrs.moduleInfo.type)}
            </p>
          <h4>{i10n.option_list_radio}</h4>

        </div>



        <div className="form-fields fields-group">

        </div>
      </div>
    );
  }
}

export default CustomCtaAllOptions;
