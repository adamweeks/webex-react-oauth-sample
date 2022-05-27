import {useState} from 'react';
import PropTypes from 'prop-types';

function GroupEditor({newGroup = false, onSave, group}) {

  const [editingGroup, setEditingGroup] = useState({
    id: '',
    displayName: '',
    description: '',
    members: [],
    ...group
  });
  const [editingGroupAddMember, setEditingGroupAddMember] = useState('');

  const handleEditingGroupChange = ({target}, key) => {
    const editedCreateGroup = {...editingGroup};
    editedCreateGroup[key] = target.value;
    setEditingGroup(editedCreateGroup);
  };

  const handleAddEditingGroupMember = () => {
    const group = {...editingGroup};
    group.members.push(editingGroupAddMember);
    setEditingGroup(group);
    setEditingGroupAddMember('');
  };

  const handleRemoveEditingGroupMember = (memberID) => {
    const group = {...editingGroup};
    group.members = group.members.filter((member) => member !== memberID);
    setEditingGroup(group);
  };

  const handleEditingGroupAddMemberChange = ({target}) => {
    setEditingGroupAddMember(target.value);
  };

  const handleSaveGroup = () => {
    onSave(editingGroup);
  };
  

  return (
    <div>
    <h2>{newGroup && 'New '} Group Editor</h2>
    <ul>
      <li>Group ID: {newGroup ? '< new group >'  : editingGroup.id}</li>
      <li>Display Name <input type="text" value={editingGroup.displayName} onChange={(event) => handleEditingGroupChange(event, 'displayName')}/></li>
      <li>Description <input type="text" value={editingGroup.description} onChange={(event) => handleEditingGroupChange(event, 'description')}/></li>
      <li>Members ({editingGroup.members?.length || 0})
        <ul>
          {editingGroup.members?.map((member, index) => (
            <li key={index}>{member}<button onClick={() => handleRemoveEditingGroupMember(member)}>remove</button></li>
          ))}
          <li><input type="text" placeholder='Member ID to Add' value={editingGroupAddMember} onChange={handleEditingGroupAddMemberChange} /><button onClick={handleAddEditingGroupMember}>Add</button></li>
        </ul>
      </li>
      <li><button onClick={handleSaveGroup}>{newGroup ? 'Save' : 'Update'} Group</button></li>
    </ul>
    
    </div>
  )
}

GroupEditor.props = {
  newGroup: PropTypes.bool,
  onSave: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired
};

GroupEditor.defaultProps = {
  newGroup: true
};

export default GroupEditor;