import Modal from "@/components/Modal";

export default function ProductDescriptionModal({
  visible,
  onClose,
  description,
}: {
  visible: boolean;
  onClose: any;
  description: string;
}) {
  return (
    <Modal open={visible} setOpen={onClose} maxWidth="sm:max-w-xl">
      <div
        id="product-description"
        className="flex justify-center items-center"
      >
        <div className="p-8 rounded-2xl bg-white">
          <div className="bg-white text-[20px] font-bold rounded text-center text-black">
            Description
          </div>
          <div>
            <span className="text-black">{description}</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
