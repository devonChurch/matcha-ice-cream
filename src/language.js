import React, { Component } from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import * as colors from "material-ui/styles/colors";
import content from "./content";

class Language extends Component {
  handleChange = newCode => {
    const { basePath } = content;
    const { href } = window.location;
    const hasLanguage = /\/\w{2}\//g.test(href);
    const currentHref = href;
    const currentCode = content.language.current;
    const newHref = (hasLanguage
      ? currentHref
      : // The build sequence creates a default language ("en") that does NOT have
        // a language stipulation in the URL. In that regard its a little harder to
        // update the language code in the URL as it does not exist. If this is the
        // case we append a hook onto the base path to make its format consistent
        // before running through the "update" / "delete" sequence.
        currentHref.replace(basePath, `${basePath}/${currentCode}`)
    ).replace(`/${currentCode}/`, `/${newCode}/`);

    window.location.assign(newHref);
  };

  render = () => (
    <SelectField
      floatingLabelText={content.language.label}
      floatingLabelStyle={{ color: colors.blue200 }}
      labelStyle={{ color: colors.white }}
      value={content.language.current}
      onChange={(e, value, payload) => this.handleChange(payload)}
    >
      {content.language.options.map(({ code, label }, index) => (
        <MenuItem key={index} value={code} primaryText={label} />
      ))}
    </SelectField>
  );
}

export default Language;
