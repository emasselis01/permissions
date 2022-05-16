import {Checkbox} from "antd";
import {useState, useEffect} from "react";
import {Permission} from "@/pages/ContentTypes/typings";
import {CheckboxOptionType} from "antd/lib/checkbox/Group";
import React from "react";

interface ActionsProps {
  group: string,
  type: string,
  permissions: Permission[], //[{}]
  onPermissionSelected: (change: number) => void
}

const PermissionActions = ({permissions, onPermissionSelected}: ActionsProps) => {

  const [options, setOptions] = useState<CheckboxOptionType[]>()

  useEffect(() => {
    setOptions(permissions.reduce((prev: CheckboxOptionType[], cur) => {
      prev.push({
        label: cur.name,
        value: cur.id,
        onChange: () => onPermissionSelected(cur.id)
      })
      return prev
    }, []))
  }, [permissions])

  return (
    <Checkbox.Group
      options={options}
    />
  )
}

export default PermissionActions;


// const permissionsInGroup = useMemo(() => {
//   const permissionActions: Permission[] = [];
//   permissions.map((permission) => {
//     if (permission.type == type && permission.group == group) {
//       permissionActions.push(permission)
//     }
//   })
//   return (
//     [...new Set(permissionActions)]
//   )
// }, [permissions])

// const groupsArray = () : [] => {
//   const options: CheckboxOptionType[] = [];
//   permissions.map((permission) => {
//     options.push({
//       label: permission.name,
//       value: permission.id,
//       onChange: () => onPermissionSelected(permission.id)
//     })
//   })
//   return options
// }
