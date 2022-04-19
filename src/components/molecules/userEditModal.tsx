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
  Input,
  useToast,
} from '@chakra-ui/react'
import { useState, useRef, useContext, useEffect } from 'react'
import { DownloadIcon } from '@chakra-ui/icons'
import { Button, GrayButton } from 'src/components/atoms/button'
import { AuthContext } from 'src/contexts/Auth.context'
import axios from 'axios'

type propsType = {
  isOpen: boolean
  onClose: () => void
}

export const UserEditModal = ({ isOpen, onClose }: propsType) => {
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [file, setFile] = useState<File>()
  const { currentUser, setCurrentUser } = useContext(AuthContext)
  const inputRef = useRef<HTMLInputElement>(null)
  const toast = useToast()

  useEffect(() => {
    if (!currentUser) return
    setName(currentUser.Name)
    setUrl(url)
  }, [currentUser, setUrl, url])

  useEffect(() => {
    if (!url) return
    setUrl(url)
  }, [setUrl, url])

  const onClickButton = () => {
    inputRef.current?.click()
  }

  const upload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const f = e.target.files[0]
    const reader = new FileReader()
    reader.onload = (e: any) => {
      setUrl(e.target.result)
    }
    setFile(f)
    reader.readAsDataURL(f)
  }

  const update = async () => {
    const data = new FormData()
    data.append('name', name)
    if (file) data.append('file', file)
    try {
      const res = await axios.put(
        `http://localhost:8080/users/${currentUser?.ID}`,
        data,
        {
          withCredentials: true,
        },
      )
      setCurrentUser(res.data)
      toast({
        description: 'プロフィールを更新しました！',
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
            <Flex position="relative" justifyContent="space-between">
              <input
                type="file"
                ref={inputRef}
                hidden
                onChange={(e) => upload(e)}
              />
              {url ? (
                <>
                  <Box
                    w="230px"
                    h="230px"
                    mx="auto"
                    onClick={onClickButton}
                    cursor="pointer"
                  >
                    <Image
                      src={url}
                      borderRadius="8px"
                      objectFit="cover"
                      w="230px"
                      h="230px"
                    />
                  </Box>
                </>
              ) : (
                <Flex
                  w="230px"
                  h="230px"
                  mx="auto"
                  bg="blackAlpha.100"
                  borderRadius="8px"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  cursor="pointer"
                  _hover={{ opacity: 0.7 }}
                  onClick={onClickButton}
                >
                  <DownloadIcon color="gray.500" w={8} h={8} mb="8px" />
                  <Text color="gray.500" fontWeight="bold">
                    画像をアップロード
                  </Text>
                </Flex>
              )}
              <Box w="400px">
                <Box mb="32px">
                  <Text fontSize="16px" fontWeight="bold" mb="8px">
                    プロフィール名
                  </Text>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="表示名を入力してください"
                  />
                </Box>
                <Box>
                  <Text fontSize="16px" fontWeight="bold" mb="8px">
                    メールアドレス
                  </Text>
                  <Input value={currentUser?.Email} isDisabled bg="gray.300" />
                </Box>
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Box mr="16px">
              <GrayButton onClick={() => onClose()}>キャンセル</GrayButton>
            </Box>
            <Box>
              <Button onClick={() => update()}>更新する</Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
