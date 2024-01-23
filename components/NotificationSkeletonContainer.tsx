import { Center, Skeleton, VStack } from 'native-base';
import React from 'react';

const NotificationSkeletonContainer = () => {
  return (
    <Center flexDirection="row" padding="1">
      <Skeleton h="16" w="16" borderRadius="full" />
      <VStack w="80%" paddingY="2" space={8} overflow="hidden" rounded="md">
        <Skeleton.Text px="3" />
      </VStack>
    </Center>
  );
};

export default NotificationSkeletonContainer;
