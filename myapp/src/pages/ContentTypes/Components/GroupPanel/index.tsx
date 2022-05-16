import {Checkbox, Table} from "antd";
import React, {useEffect, useState} from "react";
import {Permission} from "@/pages/ContentTypes/typings";
import {camelCase, startCase} from "lodash";
import "./index.less"
import { CloseOutlined } from "@ant-design/icons";

interface GroupPermissionProps {
  permissions: Permission[],
  onPermissionSelected: (change: number) => void
  permissionSelected: number[]
}

const EditGroupType = ({permissions, onPermissionSelected, permissionSelected}: Omit<GroupPermissionProps, 'group'>) => {

  const [data, setData] = useState<any[]>([])

  const editColumns: any  = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Add',
      dataIndex: 'add',
      key: 'add',
      render: (value) => {
        return value ? <Checkbox checked={value.value} onChange={() => onPermissionSelected(value.id)} /> : <CloseOutlined/>
      }
    },
    {
      title: 'View',
      dataIndex: 'view',
      key: 'view',
      render: (value) => {
        return value ? <Checkbox checked={value.value} onChange={() => onPermissionSelected(value.id)} /> : <CloseOutlined/>
      }
    },
    {
      title: 'Edit',
      dataIndex: 'change',
      key: 'change',
      render: (value) => {
        return value ? <Checkbox checked={value.value} onChange={() => onPermissionSelected(value.id)} /> : <CloseOutlined/>
      }
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      key: 'delete',
      render: (value) => {
        return value ? <Checkbox checked={value.value} onChange={() => onPermissionSelected(value.id)} /> : <CloseOutlined/>
      }
    }
  ]


  useEffect(() => {
    setData(
      permissions.map(x => {
        return {
          ...x,
          add: true,
          view: false,
          delete: false,
          change: false
        };
      })
    )
  }, [permissions])


  useEffect(() => {

    //get unique names
    const types: string[] = [...new Set(permissions.map(x => x.type))]

    const result: any[] = []
    types.forEach(type => {
      const obj: any = {
        name: startCase(camelCase(type)),
        other: []
      }


      permissions.filter(perm => perm.type == type).forEach(perm => {
        const key = perm.codename.split('_').shift() || ''
        if (['add', 'change', 'view', 'delete'].includes(key)) {
          obj[key] = {
            id: perm.id,
            value: permissionSelected.find(p => p === perm.id) || false
          }
        } else {
          obj.other.push({
            label: perm.name,
            id: perm.id,
            value: permissionSelected.find(p => p === perm.id) || false
          })
        }
      })
      result.push(obj)
    })
    setData(result)
  }, [permissions, permissionSelected])


  return (
    <>
    <Table
      dataSource={data}

      columns={editColumns}
      rowKey={"name"}
      pagination={false}
      expandable={{
        //TODO: make it so the extras are nicer looking
        expandedRowRender: (record) => {
          return record.other.map(x => {
            return <Checkbox key={x.id} onChange={() => onPermissionSelected(x.id)} > {x.label}</Checkbox>
          })
        },
        rowExpandable: record => record.other.length > 0
      }}
    >
    </Table>
    </>
  )
}

export {
  EditGroupType
}

//
// const columns = [
//   {
//     title: 'Name', dataIndex: 'name', key: 'name',
//   },
//   {
//     title: 'Add', dataIndex: 'add', key: 'add',
//   },
//   {
//     title: 'View', dataIndex: 'view', key: 'view',
//   },
//   {
//     title: 'Edit', dataIndex: 'edit', key: 'edit'
//   },
//   {
//     title: 'Delete', dataIndex: 'delete', key: 'delete'
//   },
//   {
//     title: 'Other', dataIndex: 'other', key: 'other'
//   }
// ]
//
// const GroupType = ({group, permissions, onPermissionSelected}: GroupPermissionProps) => {
//
//   const permissionTypesInGroup = useMemo(() => {
//     const permissionTypes: string[] = [];
//     permissions.map((permission) => {
//       if (permission.group == group) {
//         permissionTypes.push(permission.type)
//       }
//     })
//     return (
//       [...new Set(permissionTypes)]
//     )
//   }, [permissions])
//
//   function checkIfPresent(permissionNames: string[], name: string) {
//     let isPresent: boolean = false;
//     permissionNames.map((element) => {
//       if (element.includes(name))
//         isPresent = true
//     })
//     return isPresent
//   }
//
//   function checkForName(permissionNames: string[], name: string) {
//     let codeName: string = "";
//     permissionNames.map((element) => {
//       if (element.includes(name))
//         codeName = element
//     })
//     return codeName
//   }
//
//   function data() {
//
//     const tableData: object[] = [];
//
//     permissionTypesInGroup.map((permissionType) => {
//         const permissionNames: string[] = [];
//
//         permissions.map((permission) => {
//           if (permission.type == permissionType) {
//             permissionNames.push(permission.codename)
//           }
//         })
//
//         const permissionDetails: object = {
//           name: permissionType,
//           add: <Checkbox key={checkForName(permissionNames, "add")} value={checkForName(permissionNames, "add")}
//                          disabled={checkIfPresent(permissionNames, "add")}/>,
//           view: <Checkbox key={checkForName(permissionNames, "view")} value={checkForName(permissionNames, "view")}
//                           disabled={checkIfPresent(permissionNames, "view")}/>,
//           edit: <Checkbox key={checkForName(permissionNames, "edit")} value={checkForName(permissionNames, "edit")}
//                           disabled={checkIfPresent(permissionNames, "edit")}/>,
//           delete: <Checkbox key={checkForName(permissionNames, "delete")} value={checkForName(permissionNames, "delete")}
//                             disabled={checkIfPresent(permissionNames, "delete")}/>,
//         }
//
//         tableData.push(permissionDetails)
//       }
//     )
//     console.log(tableData);
//     return tableData
//   }
//
//   return (
//     <>
//       <Table
//         columns={columns}
//         dataSource={data()}
//         sticky
//         pagination={false}
//       />
//     </>
//   )
// }

/*
      <Collapse
        ghost
        bordered={false}
        expandIcon={({isActive}) => isActive ? < MinusCircleOutlined/> : <PlusCircleOutlined/>}
      >
        {permissionsInGroup.map((permission) => {
          return (
              <Collapse.Panel
                key={permission}
                header={<strong>{permission.charAt(0).toUpperCase() + permission.slice(1)}</strong>}
              >
                <PermissionActions
                  group={group}
                  type={permission}
                  permissions={permissions.filter(x => x.group == group && x.type == permission)}
                  onPermissionSelected={(change) => onPermissionSelected(change)}
                />
              </Collapse.Panel>
          )
        })}
      </Collapse>
 */
