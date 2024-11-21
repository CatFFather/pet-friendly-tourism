// COMPONENT
import PetTourCategoryList from "@/components/category/PetTourCategoryList";
export default function HomeLayout({ children }) {
  return (
    <div className="relative">
      <div className="sticky top-0 bg-[#FFFFFF]">
        home 레이아웃
        <PetTourCategoryList />
      </div>

      {children}
    </div>
  );
}
