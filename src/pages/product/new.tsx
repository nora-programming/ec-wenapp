import { useState, useRef } from 'react'
import { NextPage } from 'next'
import { DownloadIcon } from '@chakra-ui/icons'
import {
  Box,
  Image,
  Flex,
  Input,
  NumberInput,
  Text,
  Textarea,
  NumberInputField,
  useToast,
} from '@chakra-ui/react'
import { Common } from 'src/layout/common'
import { Button } from 'src/components/atoms/button'
import { useRequireSignin } from 'src/hooks/useRequireSignin'
import axios from 'axios'
import { useRouter } from 'next/router'

const ProductNew: NextPage = () => {
  useRequireSignin()
  const router = useRouter()
  const toast = useToast()
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [file, setFile] = useState<File>()
  const inputRef = useRef<HTMLInputElement>(null)

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

  const create = async () => {
    const data = new FormData()
    data.append('price', String(price))
    data.append('title', title)
    data.append('description', description)
    if (file) data.append('file', file)
    try {
      const res = await axios.post(`http://localhost:8080/products`, data, {
        withCredentials: true,
      })
      toast({
        description: '商品を出品しました！',
        duration: 3000,
        isClosable: true,
      })
      router.push('/')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Common>
      <Box mt="48px">
        <Box w="720px" mx="auto">
          <Text fontSize="22px" fontWeight="bold" textAlign="center" mb="24px">
            商品を出品
          </Text>
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
                <Image src={url} borderRadius="8px" />
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
          <Box mb="32px">
            <Text fontSize="18px" fontWeight="bold" mb="8px">
              商品名
            </Text>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="商品名を入力してください"
            />
          </Box>
          <Box mb="32px">
            <Text fontSize="18px" fontWeight="bold" mb="8px">
              値段
            </Text>
            <NumberInput>
              <NumberInputField
                onChange={(e) => setPrice(Number(e.target.value))}
                value={price}
                placeholder="値段を入力してください"
              />
            </NumberInput>
          </Box>
          <Box mb="32px">
            <Text fontSize="18px" fontWeight="bold" mb="8px">
              商品説明
            </Text>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="商品の説明を入力してください"
            />
          </Box>
          <Button onClick={() => create()}>出品する</Button>
        </Box>
      </Box>
    </Common>
  )
}

export default ProductNew
