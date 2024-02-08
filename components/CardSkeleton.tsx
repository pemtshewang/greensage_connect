import { Center, VStack, Skeleton } from "native-base";

const CardSkeleton = () => {
  return (
    <Center w="full">
      <VStack w="100%" maxW="400" paddingBottom="5" borderWidth="1" space={8} overflow="hidden" rounded="md" _dark={{
        borderColor: 'coolGray.500'
      }} _light={{
        borderColor: 'coolGray.200'
      }}>
        <Skeleton h="40" />
        <Skeleton.Text px="4" />
      </VStack>
    </Center>
  )
}

export default CardSkeleton;

