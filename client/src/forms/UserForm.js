import React from 'react';

class UserForm extends React.Component {


    handleSubmit(event) {
        event.preventDefault();
        return this.props.submitHandler(this.props);
    }

    render() {
        return (
            <form className="user__form" onSubmit={this.handleSubmit.bind(this)}>
                <label>
                    First Name:
                    <input type="text" name="first_name" value={this.props.first_name} />
                </label>
                <label>
                    Last Name:
                    <input type="text" name="last_name" value={this.props.last_name} />
                </label>
                <label>
                Department:
                    <select name="department" value={this.props.department || ''}>
                        <option value=''>Select department</option>
                        <option value="Development">Development</option>
                        <option value="Support">Support</option>
                        <option value="Legal">Legal</option>
                    </select>
                </label>
                <label>
                    Country
                    <select name="country" value={this.props.country || ''}>
                        <option value=''>Select country</option>
                        <option value="Ireland">Ireland</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United States">United States</option>
                    </select>
                </label>
                <label>
                    <input type="submit" value="Submit" />
                </label>
            </form>
        );
    }

}
export default UserForm;
