import {Button} from "antd";
import {EditGroupType} from "../ContentTypes/Components/GroupPanel/index"
import {useMemo, useState} from "react";
import {readData} from "@/pages/ContentTypes/utils/fetchData";
import {Permission} from "@/pages/ContentTypes/typings";
import {PageContainer} from "@ant-design/pro-layout";
import message from "antd/es/message";

const inputData: Permission[] = readData()

const ContentTypes = () => {

  const groupsArray = useMemo(() => {
    return [...new Set(inputData.map(x => x.group))]
  }, [])

  const [permissionSelected, setPermissionSelected] = useState<number[]>([]);
  const [currentTab, setCurrentTab] = useState<string>(groupsArray[0]);

  const onPermissionSelected = (change: number) => {
    if (permissionSelected.includes(change)) {
      setPermissionSelected([...permissionSelected.filter(function (value) {
        return value != change;
      })])
    } else {
      setPermissionSelected([...permissionSelected, change]);
    }
  }


  return (
    <>
      <PageContainer
        title="Permissions"
        fixedHeader={true}
        footer={[
          //TODO: make button send back changes to backend
          <Button
            type="primary"
            onClick={() => {
              console.log("Current Permissions = ", permissionSelected);
              message.success('Saved!');
            }}
          >
            Save changes
          </Button>
        ]}
        tabList={
          groupsArray.map((group) => {
            return (
              {
                tab: group.charAt(0).toUpperCase() + group.slice(1),
                key: group,
              }
            )
          })}
        tabActiveKey={currentTab}
        onTabChange={setCurrentTab}
      >
        {/*{JSON.stringify(permissionSelected)}*/}
        <EditGroupType permissions={inputData.filter(x => x.group == currentTab)} permissionSelected={permissionSelected} onPermissionSelected={onPermissionSelected}/>
        {/*<GroupType*/}
        {/*  key={currentTab}*/}
        {/*  group={currentTab}*/}
        {/*  permissions={inputData}*/}
        {/*  onPermissionSelected={onPermissionSelected}*/}
        {/*/>*/}
      </PageContainer>
    </>
  )
}

export default ContentTypes;
