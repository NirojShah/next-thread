"use client";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ProfilePage from "./Components/User Profile/UserProfile";
import Threads from "./page/threads/page";

export default function ResizableLayout() {
  return (
    <PanelGroup direction="horizontal" autoSaveId="main-layout">
      {/* Left Panel - Profile */}
      <Panel defaultSize={15} minSize={10} maxSize={30}>
        <div className="h-full border border-red-500 overflow-auto">
          <ProfilePage />
        </div>
      </Panel>

      <PanelResizeHandle className="w-2 bg-gray-200 hover:bg-blue-400 transition-colors cursor-col-resize" />

      {/* Center Panel - Threads */}
      <Panel defaultSize={70} minSize={40}>
        <div className="h-full border border-blue-600 overflow-x-scroll">
          <Threads />
        </div>
      </Panel>

      <PanelResizeHandle className="w-2 bg-gray-200 hover:bg-blue-400 transition-colors cursor-col-resize" />

      {/* Right Panel */}
      <Panel defaultSize={15} minSize={10} maxSize={30}>
        <div className="h-full border border-gray-500 overflow-auto">
          test1
        </div>
      </Panel>
    </PanelGroup>
  );
}
