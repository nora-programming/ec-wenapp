import { useRouter } from 'next/router'
import { useContext } from 'react'
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
  useToast,
} from '@chakra-ui/react'
import { AuthContext } from 'src/contexts/Auth.context'
import { ProductType } from 'src/type/product'
import { Button, GrayButton } from 'src/components/atoms/button'
import axios from 'axios'
import { RiDeleteBin6Line } from 'react-icons/Ri'
import { IconContext } from 'react-icons'

type propsType = {
  isOpen: boolean
  onClose: () => void
  product: ProductType | undefined
  loadProducts: () => void
}

export const ProductModal = ({
  isOpen,
  onClose,
  product,
  loadProducts,
}: propsType) => {
  const { currentUser } = useContext(AuthContext)
  const router = useRouter()
  const toast = useToast()

  const deleteProduct = async () => {
    if (!product) return
    if (!window.confirm('商品を削除しますか？')) return
    try {
      await axios.delete(`http://localhost:8080/products/${product.id}`, {
        withCredentials: true,
      })
      toast({
        description: '商品を削除しました！',
        duration: 3000,
        isClosable: true,
      })
      loadProducts()
      onClose()
    } catch (e) {
      console.log(e)
    }
  }

  const buy = async () => {
    if (!product) return
    if (!currentUser) {
      router.push('/signin')
      toast({
        description: 'ログインが必要です',
        duration: 3000,
        isClosable: true,
      })
    }

    const data = new FormData()
    data.append('product_id', String(product?.id))

    try {
      await axios.post(`http://localhost:8080/purchases`, data, {
        withCredentials: true,
      })
      toast({
        description: '購入しました！',
        duration: 3000,
        isClosable: true,
      })
      onClose()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent minW="800px">
          <ModalCloseButton />
          <ModalBody my="40px" mx="32px">
            <Flex position="relative">
              <Image
                src={product?.img_url}
                h="240px"
                w="240px"
                borderRadius="8px"
                objectFit="cover"
                mr="40px"
              />
              <Box w="430px">
                <Text fontWeight="bold" fontSize="28px" mb="16px">
                  {product?.title}
                </Text>
                <Text fontSize="18px">{product?.description}</Text>
                <Text
                  fontWeight="bold"
                  right="0"
                  bottom="0"
                  position="absolute"
                  fontSize="24px"
                >
                  {product?.price}円
                </Text>
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            {currentUser?.id == product?.creater_id && (
              <Box mr="16px" cursor="pointer" onClick={() => deleteProduct()}>
                <IconContext.Provider value={{ size: '25px' }}>
                  <RiDeleteBin6Line />
                </IconContext.Provider>
              </Box>
            )}
            <Box mr="16px">
              <GrayButton onClick={() => onClose()}>キャンセル</GrayButton>
            </Box>
            <Box>
              <Button onClick={() => buy()}>購入する</Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
