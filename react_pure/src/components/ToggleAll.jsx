import React from "react";

export default class ToggleAll extends React.Component {
  render() {
    return (
      <div>
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          onClick={this.props.toggleAllChange}
        />
        <label for="toggle-all">Mark all as complete</label>
      </div>
    );
  }
}
