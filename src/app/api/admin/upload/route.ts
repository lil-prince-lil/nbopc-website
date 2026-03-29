import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { getAdminFromRequest } from '@/lib/admin-auth'

export async function POST(request: NextRequest) {
  const admin = await getAdminFromRequest()
  if (!admin) {
    return NextResponse.json({ error: '未授权' }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get('file') as File | null
  if (!file) {
    return NextResponse.json({ error: '请选择文件' }, { status: 400 })
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: '不支持的文件格式' }, { status: 400 })
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: '文件大小不能超过5MB' }, { status: 400 })
  }

  try {
    const blob = await put(`uploads/${Date.now()}-${file.name}`, file, {
      access: 'public',
    })

    return NextResponse.json({ url: blob.url })
  } catch (error: unknown) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: '上传失败，请稍后重试' }, { status: 500 })
  }
}
