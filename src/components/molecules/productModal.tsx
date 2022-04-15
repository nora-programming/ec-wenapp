import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Flex,
  Image,
  Text,
} from '@chakra-ui/react'
import { ProductType } from 'src/type/product'
import { Button, GrayButton } from 'src/components/atoms/button'

type propsType = {
  isOpen: boolean
  onClose: () => void
  product: ProductType | undefined
}

export const ProductModal = ({ isOpen, onClose, product }: propsType) => {
  if (!product) return <div />
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent minW="800px">
          <ModalCloseButton />
          <ModalBody my="40px" mx="32px">
            <Flex position="relative">
              <Image
                src={product.imgUrl}
                h="240px"
                w="240px"
                borderRadius="8px"
                mr="40px"
              />
              <Box w="430px">
                <Text fontWeight="bold" fontSize="28px" mb="16px">
                  {product.title}
                </Text>
                <Text fontSize="18px">{product.description}</Text>
                <Text
                  fontWeight="bold"
                  right="0"
                  bottom="0"
                  position="absolute"
                  fontSize="24px"
                >
                  {product.price}円
                </Text>
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Box mr="16px">
              <GrayButton onClick={() => onClose()}>キャンセル</GrayButton>
            </Box>
            <Button onClick={() => console.log(product)}>購入する</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}