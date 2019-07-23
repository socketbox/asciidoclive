import {observable} from 'mobx';
import {observer} from 'mobx-react';
import * as React from 'react';
import DocManager from 'src/document/doc-manager';
import AceEditorView, {Size} from '../ace-editor-view/ace-editor-view';
import PreviewView from '../preview-view/preview-view';
import SplitLayoutView from '../split-layout-view/split-layout-view';

@observer
class EditView extends React.Component {
  render() {
    return (
      <SplitLayoutView
        left={
          <AceEditorView
            size={this.aceEditorSize}
            initialBody={''}
            onBodyChange={this.docManager.setBody.bind(this.docManager)}
          />
        }
        right={<PreviewView compiledBody={this.docManager.doc.compiledBody} />}
        className="edit-split-layout"
        onResize={(d) => {
          this.aceEditorSize.width = d.leftPaneWidth;
          this.aceEditorSize.height = d.height;
        }}
      />
    );
  }

  @observable
  private aceEditorSize: Size = {
    width: 0,
    height: 0,
  };

  private docManager = new DocManager();
}

export default EditView;
