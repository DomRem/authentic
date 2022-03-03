import React, {useEffect, useMemo, useState} from 'react';
import axios from "axios";
import getApiUrl from "../../config/selectors/getApiUrl";
import constants from "../../config/constants";
import {Table} from "../../components";

export interface IUser {
  id: string;
  email: string;
  lastName?: string;
  firstName?: string;
}

const apiUrl = getApiUrl(constants);

const Dashboard = (): JSX.Element => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [error, setError] = useState<string | null>();

  const fetchUsers = async () => {
    try {
      const response = await axios(`${apiUrl}/users`, {
        method: 'GET',
      });
      const data = await response.data;
      setUsers(data);
    } catch (e) {
      // @ts-ignore
      if (axios.isAxiosError(e) && e.response?.status === 401) {
        setError('Invalid email or password');
      } else {
        console.log(`Unknown err: ${e}`);
      }
    }
  };

  useEffect(() => {
    fetchUsers()
  }, [])

  const columns = useMemo(
    () => [
      {
        Header: 'Users',
        columns: [
          {
            Header: 'ID',
            accessor: 'id',
          },
          {
            Header: 'Email',
            accessor: 'email',
          },
          {
            Header: 'First name',
            accessor: 'firstName',
          },
          {
            Header: 'Last name',
            accessor: 'lastName',
          },
        ],
      },
    ],
    []
  )

  // TODO: center dashboard
  return (users.length ? <Table columns={columns} data={users}/> : <div>Table is empty</div>)
}

export default Dashboard;