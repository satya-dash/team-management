import React,{ Component } from 'react';
import { connect } from 'react-redux'
import {getTeamMember,getTeamList} from '../reducers';
import { addMember,deleteMember } from '../actions';
import { Link } from 'react-router-dom';


class CreateForm extends Component {
	constructor(props){
		super(props);
		this.state = this._initateProps(props.match.params.id);
		this.onFieldChange = this.onFieldChange.bind(this);
		this.onRadioChange = this.onRadioChange.bind(this);
		this._onSave = this._onSave.bind(this);
		this._onDelete = this._onDelete.bind(this);
	}
	_initateProps(id){
		return getTeamMember(id,this.props.team);
	}
	onFieldChange(type,ev,value){
		if(type === 'mobile' && isNaN(value.trim()))
			return false;
		this.setState({
			[type]:value.trim()
		});
	}
	onRadioChange(type){
		this.setState({
			role:type
		});	
	}
	_emailVerify(email){
		return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
	}
	_onSave(){
		let {fName,lName,email,mobile,role} = this.state;
		let {addMember,history} = this.props;
		if(!fName || !lName || !this._emailVerify(email) || !mobile || mobile.length !== 10){
			alert('Your inputs are not correct');
			return false;
		}
		addMember(fName,lName,email,mobile,role);
		history.goBack();
	}
	_onDelete(){
		let {id} = this.state;
		let {deleteMember,history} = this.props;
		deleteMember(id);
		history.goBack();
	}
	render() {
		let {fName,lName,email,mobile,role,id} = this.state;
		let isEdit = id === 'add' ? false: true;
		return (
			<div>
				<div className="floatRight">
		          <Link to="/"><i className="material-icons icons">clear</i></Link>
		        </div>
		        <div className="floatLeft" style={{marginLeft:10}}>
		        	<h2>Add a team member</h2>
		          	<h5>{isEdit ? `Edit contact info,`: `Set email,`} location and role</h5>
		        </div>
		        <hr/>
		        <div style={{marginLeft:10}}>
		        	<p className="floatLeft">Info</p>
		        	<Element 
		        		placeholder="First name" 
		        		name="fName" 
		        		value={fName} 
		        		onChange={this.onFieldChange.bind(this,'fName')}/>
		        	<Element 
		        		placeholder="Last name"
		        		name="lName" 
		        		value={lName} 
		        		onChange={this.onFieldChange.bind(this,'lName')}/>
		        	<Element 
		        		type="text" 
		        		placeholder="Email" 
		        		name="email" 
		        		value={email} 
		        		onChange={this.onFieldChange.bind(this,'email')}/>
		        	<Element 
		        		type="tel" 
		        		placeholder="Mobile" 
		        		maxLength={10}
		        		name="mobile" 
		        		value={mobile} 
		        		onChange={this.onFieldChange.bind(this,'mobile')}/>
		        	<p className="floatLeft">Role</p>
		        	<div className="floatLeft radioClass">
		        		Regular - can't delete members 
		        		<input 
		        			type="radio" name="role" value="F"
		        			style={{marginLeft:'20%',fontSize:20}}
		        			checked={role==='F'}
		        			onChange={this.onRadioChange.bind(this,'F')}/>
		        	</div>
		        	<div className="floatLeft radioClass">
  						Admin - can delete members 
  						<input 
  							type="radio" name="role" value="T"
  							style={{marginLeft:'26%',fontSize:20}}
  							checked={role==='T'}
  							onChange={this.onRadioChange.bind(this,'T')}/>
		        	</div>
		        	<div style={{paddingTop:10}}>
		        		{isEdit && 
			        		<button 
			        			className="actionButton deleteBtn"
			        			onClick={this._onDelete}>
			  						Delete
			  				</button>
		  				}
	  					<button
	  						className="actionButton saveBtn"
	  						onClick={this._onSave}>
	  						Save
	  					</button>
		        	</div>
				</div>
			</div>
		)
	}
}

const mapDispatchToProps = {
	addMember,
	deleteMember
}
const mapStateToProps = state => ({
  team: getTeamList(state)
})

export default connect(mapStateToProps,mapDispatchToProps)(CreateForm)

class Element extends Component{
	render(){
		let { type, name, placeholder,value} = this.props;
		return (
			<input
				{...this.props}
				className="inputElement"
				type={type||'text'} 
				name = {name||''}
				placeholder={placeholder||''}
				value={value}
				onChange={el=>{
					this.props.onChange(el,el.target.value);
				}}/>

		);
	}
}