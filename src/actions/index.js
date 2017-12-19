export const addMember = (fName,lName,email,mobile,role) => ({
  type: 'ADD_MEMBER',
  fName,lName,email,mobile,role
})

export const deleteMember = (id) => ({
  type: 'DELETE_MEMBER',
  id
})