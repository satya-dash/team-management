const initialState = {
	team: [
  	]
}
const todos = (state = initialState.team, action) => {
  switch (action.type) {
	case 'ADD_MEMBER':
		return [
			...state,
			{
				id: state.length+1,
				fName: action.fName,
				lName: action.lName,
				email:action.email,
				mobile:action.mobile,
				role:action.role
			}
		]
	case 'DELETE_MEMBER':
	  	return state.filter(todo => todo.id !== action.id);
	default:
	  return state
  }
}

export const getTeamList = state => state;
export const getTeamMember = (id,state) => {
	let res = state.filter(el=>el.id === parseInt(id));
	if(res && res.length)
		return res[0];
	return {
		id:id,
		fName:'',
		lName:'',
		email:'',
		mobile:'',
		role:'F'
	};
};

export default todos
