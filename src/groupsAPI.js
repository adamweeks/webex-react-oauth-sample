export async function getGroups(token) {
  const response = await fetch('https://webexapis.com/v1/groups', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`, 
    },
    });
  
    if (!response.ok) {
      const resulterr = await response.json();
      throw new Error(`Error! status: ${response.status}, message: ${resulterr.message}`);
    }
  
    const result = await response.json();
    
    console.log('result is: ', JSON.stringify(result, null, 4));

    return result.groups;
}

export async function getGroup(token, groupID, includeMembers = false) {
  const response = await fetch(`https://webexapis.com/v1/groups/${groupID}?includeMembers=${includeMembers}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`, 
    },
  });

  if (!response.ok) {
    const resulterr = await response.json();
    throw new Error(`Error! status: ${response.status}, message: ${resulterr.message}`);
  }

  const result = await response.json();
  
  console.log('result is: ', JSON.stringify(result, null, 4));

  return result;
}

export async function createGroup(token, {displayName, description, members}) {
  const membersFormatted = members.split(',').map((m) => ({id: m}));
  // Create POST Body from inputs
  const postBody = {
    displayName,
    description,
    members: membersFormatted
  };

  const response = await fetch('https://webexapis.com/v1/groups', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`, 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postBody)
  });

  if (!response.ok) {
    const resulterr = await response.json();
    throw new Error(`Error! status: ${response.status}, message: ${resulterr.message}`);
  }

  const result = await response.json();

  console.log('result is: ', JSON.stringify(result, null, 4));

  return result;
}

export async function updateGroup(token, {groupID, displayName, description, membersAdd = [], membersDelete = []}) {
  // PATCH for Members format:
  // [{
  //   "id": "....",
  //   "operation": "add" || "delete"
  // }]
  const members = membersAdd?.map((m) => ({id: m, operation: 'add'}));
  membersDelete.forEach((diff) => {
    members.push({id: diff, operation: 'delete'});
  });
  
  // Create PATCH Body from inputs
  const patchBody = {
    displayName,
    description,
    members
  };

  const response = await fetch(`https://webexapis.com/v1/groups/${groupID}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`, 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(patchBody)
  });

  if (!response.ok) {
    const resulterr = await response.json();
    throw new Error(`Error! status: ${response.status}, message: ${resulterr.message}`);
  }

  const result = await response.json();
  
  console.log('result is: ', JSON.stringify(result, null, 4));

  return result;
}