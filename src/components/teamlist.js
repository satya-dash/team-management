import React,{Component} from 'react';
import { Link } from 'react-router-dom';

class TeamList extends Component {
	render(){
		let {teams} = this.props;
		if(!teams.length)
			return (
				<div style={{margin:10}}>
					Click on the + button to add member into the team
				</div>
			);
		return teams.map((el,i)=>{
			return(
				<Link key={`member-${i}`} to={`/${el.id}`}>
					<div className="teamMember">
						<div className="memberLogo">
							<i className="material-icons">account_circle</i>
						</div>
						<div className="teamName">
							<div className="headerName">
								{`${el.fName} ${el.lName}`} {el.role === 'T' ? `(admin)`: ``}
							</div>
							<div>
								{el.mobile.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}
							</div>
							<div>
								{el.email}
							</div>
						</div>
					</div>
				</Link>
			);
		});
	}
}

export default TeamList;