import React, { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'
import { ObservedPermissionsList } from '@molecules/permissions/permissions_list/permissions_list'
import { Text } from '@atoms/typography/text/text'
import { usePermissionsStore } from '@hooks/stores/stores'
import { View } from 'react-native'
import styled from 'styled-components/native'

const Wrapper = styled(View)`
  flex: 1;
`

const PermissionsContent = (): ReactElement => {
  const { permissionGroupsList } = usePermissionsStore()

  return (
    <Wrapper>
      <Text>Permissions</Text>
      <ObservedPermissionsList permissionsList={permissionGroupsList} />
    </Wrapper>
  )
}

const ObservedPermissionsContent = observer(PermissionsContent)

export { PermissionsContent, ObservedPermissionsContent }
