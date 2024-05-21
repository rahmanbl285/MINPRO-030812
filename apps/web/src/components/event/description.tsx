import { getEvent, getEventSlug } from "@/lib/event"
import { IEvent } from "@/types/event"

export const revalidate = 3600

export const generateStaticParams = async () => {
  const data = await getEvent()

  return data.events?.map((event: IEvent) => ({
      params: {
          slug: event?.eventSlug
      }
  }))
}

export async function generateMetadata({ params }: { params: { slug: string }}) {
  const data = await getEventSlug(params.slug)
  console.log(data)

  return data
}

export default async function Description ({ params }: { params: { slug: string }}) {
    const data = await getEventSlug(params.slug)

    return (
        <div>
        </div>
    )
}