export default function DefaultPage({ params }: { params: { id: string } }) {
    return <div>Hello there {params.id}</div>;
}
