import React, { ReactElement } from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { observer } from 'mobx-react-lite'
import { PermissionsListItem } from '@atoms/permissions/permissions_list_item/permissions_list_item'
import { IPermissionGroup } from '@models/permissions/permission_group/permission_group.types'

const Wrapper = styled(View)`
  border-width: 1px;
  border-radius: 12px;
  border-color: ${(props) => props.theme.colors.blue};
`

type TPermissionsListProps = {
  permissionsList: IPermissionGroup[]
}

const Separator = styled(View)`
  height: 1px;
  background-color: ${(props) => props.theme.colors.blue};
`

const PermissionsList = ({ permissionsList }: TPermissionsListProps): ReactElement => {
  const renderItem = ({ id, name, request, isGranted, isBlocked, isUnavailable }: IPermissionGroup, index: number) => {
    const isLast = index < permissionsList.length - 1

    return (
      <React.Fragment key={id}>
        <PermissionsListItem
          isUnavailable={isUnavailable}
          isBlocked={isBlocked}
          isGranted={isGranted}
          label={name}
          onPress={request}
        />
        {isLast && <Separator />}
      </React.Fragment>
    )
  }

  return <Wrapper>{permissionsList.map(renderItem)}</Wrapper>
}

const ObservedPermissionsList = observer(PermissionsList)

export { PermissionsList, ObservedPermissionsList }
