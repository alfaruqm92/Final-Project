import Avatar from "../atoms/Avatar";
import Icon from "../atoms/Icon";

function UserMenu({name = "User",avatar, onClick}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 rounded-lg p-1.5 transition hover:bg-[#EAECF0]"
    >
      <Avatar
        src={avatar}
        alt={name}
        size="sm"
      />

      <span className="hidden text-sm font-medium text-[#233D4D] sm:block">
        {name}
      </span>

      <Icon
        name="chevronDown"
        size={16}
      />
    </button>
  );
}

export default UserMenu;