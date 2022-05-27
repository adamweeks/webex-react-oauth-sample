import {useEffect, useState} from 'react';

import {createGroup, getGroup, getGroups, updateGroup} from './groupsAPI';

import GroupEditor from './GroupEditor';

import './Groups.css';

function Groups({token}) {
  const [groupsList, setGroupsList] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isLoadingGroupDetails, setIsLoadingGroupDetails] = useState(false);
  const [err, setErr] = useState('');
  const [editingGroupOriginal, setEditingGroupOriginal] = useState(null);
  const [editingGroup, setEditingGroup] = useState(null);
  
  // Load our groups when we render
  useEffect(() => {
    const updateGroups = async () => {
      setIsFetching(true);
      setErr('');
    
      try {
        const groups = await getGroups(token);
        setGroupsList(groups);
      } catch (requestError) {
        setErr(requestError.message);
      } finally {
        setIsFetching(false);
      }
    };

    updateGroups();
  }, [token]);
 
  // Create a new group via POST
  const handleCreateGroup = async (groupToCreate) => {
    setErr('');

    try {
      const createdGroup = await createGroup(token, groupToCreate);
  
      // TODO: Add new group to displayed list
    } catch (requestError) {
      setErr(requestError.message);
    }
  };

  // Load details of existing group to display in editor
  const handleEditGroup = async (groupId) => {
    setIsLoadingGroupDetails(true);
    setEditingGroup(null);
    setErr('');
    
    try {
      const result = await getGroup(token, groupId, true);

      const constructedGroup = {
        "id": result.id,
        "displayName": result.displayName,
        "description": result.description || '',
        "members": result.members?.map((m) => m.id)
      };
      setEditingGroup(constructedGroup);
      setEditingGroupOriginal(constructedGroup);
      
    } catch (requestError) {
      setErr(requestError.message);
    } finally {
      setIsLoadingGroupDetails(false);
    }
  };

  // Update the group details with a PATCH request
  const handleUpdateGroup = async (editedGroup) => {
    // TODO: Function
    setErr('');
    
    try {
      const membersAdd = editedGroup.members;
      // Diff the original members if any have been removed
      let membersDelete = editingGroupOriginal.members.filter(x => !editedGroup.members.includes(x));
      
      const groupUpdate = {
        groupID: editedGroup.id, 
        displayName: editedGroup.displayName, 
        description: editedGroup.description,
        membersAdd,
        membersDelete
      };

      const result = await updateGroup(token, groupUpdate);
  
      const constructedGroup = {
        "id": result.id,
        "displayName": result.displayName,
        "decription": result.description || '',
        "members": result.members?.map((m) => m.id)
      };
      setEditingGroup(constructedGroup);
      setEditingGroupOriginal(constructedGroup);
      // TODO: Update group in main group list
    } catch (requestError) {
      setErr(requestError.message);
    }
  };

  return (
    <div className="groups">
      {err && (
        <div className='section'>
          <h3 className='error'>{err}</h3>
        </div>
      )}
      <div className="section">
        <h2>My Groups</h2>
        { isFetching && (
          <div>Loading groups...</div>
        )}
        {
          groupsList && (
            <ul>
              {groupsList.map((group) => (
                <li key={group.id}>{group.displayName}
                  <ul>
                    <li>ID: {group.id}</li>
                    <li>Description:  {group.description}</li>
                    <li><button onClick={() => handleEditGroup(group.id)}>Edit</button></li>
                  </ul>
                </li>
              ))}
            </ul>
          )
        }
        <div className="section">
          <h3>Group Editor</h3>
          {
            isLoadingGroupDetails && (
              <>Loading Group Details...</>
            )
          }
          {
            editingGroup && <GroupEditor newGroup={false} group={editingGroup} onSave={handleUpdateGroup}/>
          }
        </div>
      </div>
      <div className='section'>
        <GroupEditor newGroup onSave={handleCreateGroup}/>
      </div>
    </div>
  )
}

export default Groups;