// STORE
export default function PetTourCategoryList({ categoryCodeList }) {
  return (
    <ul className="px-3 overflow-x-auto whitespace-nowrap flex">
      {categoryCodeList?.map((code) => {
        return (
          <li className="px-1" key={code?.code}>
            {code?.name}
          </li>
        );
      })}
    </ul>
  );
}
